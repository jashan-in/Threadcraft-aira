import { currentUser } from "@clerk/nextjs/server";

import { prisma } from "@/lib/prisma";

export async function getDbUser() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return null;
  }

  const email =
    clerkUser.primaryEmailAddress?.emailAddress;

  if (!email) {
    throw new Error(
      "Authenticated user does not have an email address."
    );
  }

  const user = await prisma.user.upsert({
    where: {
      clerkId: clerkUser.id,
    },

    update: {
      email,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
    },

    create: {
      clerkId: clerkUser.id,
      email,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
    },
  });

  return user;
}