import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
    },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const authHeader = req.headers.get("Authorization");

    if (!supabaseUrl || !anonKey || !serviceRoleKey) {
      return json({ error: "Server configuration is incomplete." }, 500);
    }

    if (!authHeader) {
      return json({ error: "Unauthorized" }, 401);
    }

    const userClient = createClient(supabaseUrl, anonKey, {
      global: {
        headers: {
          Authorization: authHeader,
        },
      },
    });

    const serviceClient = createClient(supabaseUrl, serviceRoleKey);

    const {
      data: { user },
      error: userError,
    } = await userClient.auth.getUser();

    if (userError || !user) {
      return json({ error: "Unauthorized" }, 401);
    }

    const { data: isAdmin, error: roleError } = await userClient.rpc("has_role", {
      _user_id: user.id,
      _role: "admin",
    });

    if (roleError || !isAdmin) {
      return json({ error: "Forbidden" }, 403);
    }

    if (req.method === "GET") {
      const { data: roles, error: rolesError } = await serviceClient
        .from("user_roles")
        .select("user_id")
        .eq("role", "admin");

      if (rolesError) {
        return json({ error: rolesError.message }, 400);
      }

      const adminIds = [...new Set((roles ?? []).map((role) => role.user_id))];
      const adminUsers = await Promise.all(
        adminIds.map(async (adminId) => {
          const { data, error } = await serviceClient.auth.admin.getUserById(adminId);
          if (error || !data.user?.email) return null;

          return {
            user_id: adminId,
            email: data.user.email,
            created_at: data.user.created_at ?? null,
          };
        }),
      );

      return json({ admins: adminUsers.filter(Boolean) });
    }

    const body = await req.json().catch(() => ({}));

    if (req.method === "POST") {
      const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
      const password = typeof body.password === "string" ? body.password.trim() : "";

      if (!email || !password || password.length < 8) {
        return json({ error: "Valid email and password are required." }, 400);
      }

      const { data: allUsers, error: listError } = await serviceClient.auth.admin.listUsers({
        page: 1,
        perPage: 1000,
      });

      if (listError) {
        return json({ error: listError.message }, 400);
      }

      const existingUser = allUsers.users.find((entry) => entry.email?.toLowerCase() === email);

      let targetUserId = existingUser?.id;

      if (!targetUserId) {
        const { data: createdUser, error: createError } = await serviceClient.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
        });

        if (createError || !createdUser.user) {
          return json({ error: createError?.message || "Unable to create user." }, 400);
        }

        targetUserId = createdUser.user.id;
      }

      const { error: upsertError } = await serviceClient.from("user_roles").upsert(
        {
          user_id: targetUserId,
          role: "admin",
        },
        {
          onConflict: "user_id,role",
        },
      );

      if (upsertError) {
        return json({ error: upsertError.message }, 400);
      }

      const { data: targetUser, error: targetUserError } = await serviceClient.auth.admin.getUserById(targetUserId);

      if (targetUserError || !targetUser.user?.email) {
        return json({ error: "Admin created, but user details could not be loaded." }, 200);
      }

      return json({
        admin: {
          user_id: targetUserId,
          email: targetUser.user.email,
          created_at: targetUser.user.created_at ?? null,
        },
      });
    }

    if (req.method === "DELETE") {
      const userId = typeof body.userId === "string" ? body.userId : "";

      if (!userId) {
        return json({ error: "User ID is required." }, 400);
      }

      if (userId === user.id) {
        return json({ error: "You cannot remove your own admin access." }, 400);
      }

      const { error: deleteError } = await serviceClient
        .from("user_roles")
        .delete()
        .eq("user_id", userId)
        .eq("role", "admin");

      if (deleteError) {
        return json({ error: deleteError.message }, 400);
      }

      return json({ success: true });
    }

    return json({ error: "Method not allowed." }, 405);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return json({ error: message }, 500);
  }
});
