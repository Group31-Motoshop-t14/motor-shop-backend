-- CreateEnum
CREATE TYPE "Fuel" AS ENUM ('FLEX', 'HIBRIDO', 'ELETRICO');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "is_advertiser" BOOLEAN NOT NULL DEFAULT false,
    "addressId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cars" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "fuel_type" "Fuel" NOT NULL,
    "mileage" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "fipe_price" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "cover_image" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("userId","carId")
);

-- CreateTable
CREATE TABLE "CarImages" (
    "id" BIGINT NOT NULL,
    "url" TEXT NOT NULL,
    "carId" TEXT NOT NULL,

    CONSTRAINT "CarImages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_addressId_key" ON "Users"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "Cars_userId_key" ON "Cars"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CarImages_carId_key" ON "CarImages"("carId");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cars" ADD CONSTRAINT "Cars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarImages" ADD CONSTRAINT "CarImages_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
