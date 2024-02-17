import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginPage({
  params,
  searchParams,
}: {
  params: {};
  searchParams: {
    token: string;
  };
}) {
  const { token } = searchParams;

  if (token) {
    const passwordlessToken = await prisma.token.findFirst({
      where: {
        token: token,
        expires: {
          gt: new Date(),
        },
      },
    });

    if (passwordlessToken) {
      const user = await prisma.user.findFirst({
        where: {
          email: passwordlessToken.email,
        },
      });

      if (!user) {
        redirect("/register");
      }

      cookies().set("user", user.id.toString(), {
        maxAge: 60 * 60 * 24 * 7,
      });
    }
  }

  redirect("/");
}
