import { auth } from "@clerk/nextjs";
import prisma from "./prisma";

const DAY_IN_MS = 86_400_000;

export async function checkSubscription() {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userSubscription = await prisma.userSubscription.findUnique({
    where: {
      userId,
    },
    select: {
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
      stripeSubscriptionId: true,
    },
  });

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValid;
}
