-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthDay" TEXT NOT NULL,
    "birthMonth" TEXT NOT NULL,
    "birthYear" TEXT NOT NULL,
    "areaOfResidence" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Admin" (
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Schemes" (
    "schemeName" TEXT NOT NULL,
    "schemeId" TEXT NOT NULL,
    "minAge" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "areaOfResidence" TEXT NOT NULL,
    "annualIncome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Application" (
    "applicationId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "schemeId" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("applicationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Schemes_schemeName_key" ON "Schemes"("schemeName");

-- CreateIndex
CREATE UNIQUE INDEX "Schemes_schemeId_key" ON "Schemes"("schemeId");

-- CreateIndex
CREATE UNIQUE INDEX "Application_userId_key" ON "Application"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Application_schemeId_key" ON "Application"("schemeId");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "Schemes"("schemeId") ON DELETE RESTRICT ON UPDATE CASCADE;
