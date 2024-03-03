// Import PrismaClient
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Refactored functions using Prisma

const getOne = async (id: string) => {
  try {
    const child = await prisma.child.findUnique({
      where: { id },
    });
    return child;
  } catch (error) {
    console.error(`Error getting child from DB: `, error);
    throw error;
  }
};

const getByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error(`Error getting user by email from DB: `, error);
    throw error;
  }
};

const create = async (data: any) => {
  try {
    const newChild = await prisma.child.create({
      data,
    });
    return newChild;
  } catch (error) {
    console.error(`Error saving child to DB: `, error);
    throw error;
  }
};

const textSearch = async (
  searchTerm: string,
  offset: number,
  pageSize: number
) => {
  // Note: Prisma does not directly support full-text search for MySQL as of my last update.
  // You would typically handle this logic in your application code or use raw SQL queries with Prisma if necessary.
  // Here's an example of a simple search that might not fully replace full-text search capabilities:
  try {
    const results = await prisma.child.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: searchTerm,
            },
          },
          {
            lastName: {
              contains: searchTerm,
            },
          },
        ],
      },
      take: pageSize,
      skip: offset,
    });
    return results;
  } catch (error) {
    console.error(`Error performing text search: `, error);
    throw error;
  }
};

export const db = {
  getOne,
  getByEmail,
  create,
  textSearch,
};
