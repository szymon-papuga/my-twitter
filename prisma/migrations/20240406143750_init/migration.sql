-- CreateTable
CREATE TABLE "Tweet" (
    "id" SERIAL NOT NULL,
    "text" VARCHAR(140) NOT NULL,
    "creationTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tweet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
