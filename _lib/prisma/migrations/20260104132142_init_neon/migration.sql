-- CreateEnum
CREATE TYPE "type_product" AS ENUM ('photo', 'video');

-- CreateEnum
CREATE TYPE "type_status_vote" AS ENUM ('like', 'dislike');

-- CreateEnum
CREATE TYPE "status_action_vote" AS ENUM ('like', 'dislike', 'null');

-- CreateEnum
CREATE TYPE "user_gender" AS ENUM ('male', 'female', 'anonymous');

-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('admin', 'creator');

-- CreateEnum
CREATE TYPE "type_report" AS ENUM ('users', 'image', 'video', 'music');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID DEFAULT gen_random_uuid(),
    "public_id" TEXT NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255),
    "role" "user_role" DEFAULT 'creator',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "users_description" (
    "ref_id" UUID NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "biodata" TEXT,
    "gender" "user_gender" DEFAULT 'anonymous',
    "phone_number" TEXT,
    "location" TEXT,
    "picture" TEXT,
    "social_link" JSONB DEFAULT '[]',
    "updated_at" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "users_stats" (
    "ref_id_user" UUID NOT NULL,
    "total_views" INTEGER NOT NULL DEFAULT 0,
    "total_followers" INTEGER NOT NULL DEFAULT 0,
    "total_image" INTEGER NOT NULL DEFAULT 0,
    "total_video" INTEGER NOT NULL DEFAULT 0,
    "total_music" INTEGER NOT NULL DEFAULT 0,
    "total_report" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "users_product" (
    "ref_id" UUID NOT NULL,
    "id_product" INTEGER NOT NULL,
    "type" "type_product",
    "folder_name" VARCHAR(255) NOT NULL,
    "status" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "users_product_image" (
    "ref_id_product" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "image_name" VARCHAR(255) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "hashtag" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "category" TEXT[] DEFAULT ARRAY[]::TEXT[]
);

-- CreateTable
CREATE TABLE "users_product_video" (
    "ref_id_product" INTEGER NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "duration" DOUBLE PRECISION,
    "width" INTEGER,
    "height" INTEGER,
    "format" TEXT,
    "cloud_public_id" VARCHAR(255) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "thumbnail_url" VARCHAR(255) NOT NULL,
    "hashtag" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "category" TEXT[] DEFAULT ARRAY[]::TEXT[]
);

-- CreateTable
CREATE TABLE "users_photo_stats" (
    "ref_id_product" INTEGER NOT NULL,
    "views" INTEGER DEFAULT 0,
    "like" INTEGER DEFAULT 0,
    "dislike" INTEGER DEFAULT 0,
    "share" INTEGER DEFAULT 0,
    "bookmark" INTEGER DEFAULT 0,
    "report" INTEGER DEFAULT 0
);

-- CreateTable
CREATE TABLE "users_video_stats" (
    "ref_id_product" INTEGER NOT NULL,
    "views" INTEGER DEFAULT 0,
    "like" INTEGER DEFAULT 0,
    "dislike" INTEGER DEFAULT 0,
    "share" INTEGER DEFAULT 0,
    "bookmark" INTEGER DEFAULT 0,
    "report" INTEGER DEFAULT 0
);

-- CreateTable
CREATE TABLE "users_interactions_vote" (
    "ref_id_product" INTEGER NOT NULL,
    "ref_id_sender" UUID NOT NULL,
    "action_vote" "status_action_vote" DEFAULT 'null',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "users_interactions_comment" (
    "parent_id_comment" INTEGER NOT NULL,
    "type_comment" "type_product" NOT NULL,
    "ref_id_product" INTEGER NOT NULL,
    "ref_id_sender" UUID NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_interactions_comment_pkey" PRIMARY KEY ("parent_id_comment")
);

-- CreateTable
CREATE TABLE "users_interactions_bookmark" (
    "ref_id_product" INTEGER NOT NULL,
    "ref_id_sender" UUID NOT NULL,
    "status" BOOLEAN NOT NULL,
    "type_bookmark" "type_product" NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "users_interactions_followers" (
    "ref_id_receiver" UUID NOT NULL,
    "ref_id_sender" UUID NOT NULL,
    "status" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "users_interactions_report" (
    "ref_id_sender" UUID NOT NULL,
    "ref_id_receiver" UUID NOT NULL,
    "ref_id_product" INTEGER,
    "type" "type_report" NOT NULL,
    "text" JSONB DEFAULT '[]',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_public_id_key" ON "users"("public_id");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_created_at_idx" ON "users"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "users_description_ref_id_key" ON "users_description"("ref_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_stats_ref_id_user_key" ON "users_stats"("ref_id_user");

-- CreateIndex
CREATE INDEX "users_stats_ref_id_user_idx" ON "users_stats"("ref_id_user");

-- CreateIndex
CREATE UNIQUE INDEX "users_product_id_product_key" ON "users_product"("id_product");

-- CreateIndex
CREATE INDEX "idx_ref_id" ON "users_product"("ref_id");

-- CreateIndex
CREATE INDEX "idx_created_at" ON "users_product"("created_at");

-- CreateIndex
CREATE INDEX "idx_type" ON "users_product"("type");

-- CreateIndex
CREATE INDEX "idx_folder_name" ON "users_product"("folder_name");

-- CreateIndex
CREATE INDEX "idx_ref_id_created_at" ON "users_product"("ref_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "users_product_image_ref_id_product_key" ON "users_product_image"("ref_id_product");

-- CreateIndex
CREATE UNIQUE INDEX "users_product_video_ref_id_product_key" ON "users_product_video"("ref_id_product");

-- CreateIndex
CREATE UNIQUE INDEX "users_product_video_ref_id_product_cloud_public_id_key" ON "users_product_video"("ref_id_product", "cloud_public_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_photo_stats_ref_id_product_key" ON "users_photo_stats"("ref_id_product");

-- CreateIndex
CREATE INDEX "users_photo_stats_ref_id_product_idx" ON "users_photo_stats"("ref_id_product");

-- CreateIndex
CREATE INDEX "users_photo_stats_views_idx" ON "users_photo_stats"("views");

-- CreateIndex
CREATE INDEX "users_photo_stats_like_dislike_idx" ON "users_photo_stats"("like", "dislike");

-- CreateIndex
CREATE INDEX "users_photo_stats_share_idx" ON "users_photo_stats"("share");

-- CreateIndex
CREATE INDEX "users_photo_stats_bookmark_idx" ON "users_photo_stats"("bookmark");

-- CreateIndex
CREATE INDEX "users_photo_stats_report_idx" ON "users_photo_stats"("report");

-- CreateIndex
CREATE UNIQUE INDEX "users_video_stats_ref_id_product_key" ON "users_video_stats"("ref_id_product");

-- CreateIndex
CREATE INDEX "users_video_stats_ref_id_product_idx" ON "users_video_stats"("ref_id_product");

-- CreateIndex
CREATE INDEX "users_video_stats_views_idx" ON "users_video_stats"("views");

-- CreateIndex
CREATE INDEX "users_video_stats_like_dislike_idx" ON "users_video_stats"("like", "dislike");

-- CreateIndex
CREATE INDEX "users_video_stats_share_idx" ON "users_video_stats"("share");

-- CreateIndex
CREATE INDEX "users_video_stats_bookmark_idx" ON "users_video_stats"("bookmark");

-- CreateIndex
CREATE INDEX "users_video_stats_report_idx" ON "users_video_stats"("report");

-- CreateIndex
CREATE INDEX "users_interactions_vote_ref_id_product_idx" ON "users_interactions_vote"("ref_id_product");

-- CreateIndex
CREATE UNIQUE INDEX "users_interactions_vote_ref_id_product_ref_id_sender_key" ON "users_interactions_vote"("ref_id_product", "ref_id_sender");

-- CreateIndex
CREATE INDEX "users_interactions_comment_parent_id_comment_idx" ON "users_interactions_comment"("parent_id_comment");

-- CreateIndex
CREATE INDEX "users_interactions_comment_ref_id_sender_idx" ON "users_interactions_comment"("ref_id_sender");

-- CreateIndex
CREATE INDEX "users_interactions_bookmark_status_idx" ON "users_interactions_bookmark"("status");

-- CreateIndex
CREATE UNIQUE INDEX "users_interactions_bookmark_ref_id_product_ref_id_sender_key" ON "users_interactions_bookmark"("ref_id_product", "ref_id_sender");

-- CreateIndex
CREATE INDEX "users_interactions_followers_status_idx" ON "users_interactions_followers"("status");

-- CreateIndex
CREATE INDEX "users_interactions_followers_ref_id_sender_idx" ON "users_interactions_followers"("ref_id_sender");

-- CreateIndex
CREATE UNIQUE INDEX "users_interactions_followers_ref_id_receiver_ref_id_sender_key" ON "users_interactions_followers"("ref_id_receiver", "ref_id_sender");

-- CreateIndex
CREATE INDEX "users_interactions_report_ref_id_sender_idx" ON "users_interactions_report"("ref_id_sender");

-- CreateIndex
CREATE INDEX "users_interactions_report_type_idx" ON "users_interactions_report"("type");

-- CreateIndex
CREATE UNIQUE INDEX "users_interactions_report_ref_id_sender_ref_id_receiver_key" ON "users_interactions_report"("ref_id_sender", "ref_id_receiver");

-- AddForeignKey
ALTER TABLE "users_description" ADD CONSTRAINT "users_description_ref_id_fkey" FOREIGN KEY ("ref_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_stats" ADD CONSTRAINT "users_stats_ref_id_user_fkey" FOREIGN KEY ("ref_id_user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_product" ADD CONSTRAINT "users_product_ref_id_fkey" FOREIGN KEY ("ref_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_product_image" ADD CONSTRAINT "users_product_image_ref_id_product_fkey" FOREIGN KEY ("ref_id_product") REFERENCES "users_product"("id_product") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_product_video" ADD CONSTRAINT "users_product_video_ref_id_product_fkey" FOREIGN KEY ("ref_id_product") REFERENCES "users_product"("id_product") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_photo_stats" ADD CONSTRAINT "users_photo_stats_ref_id_product_fkey" FOREIGN KEY ("ref_id_product") REFERENCES "users_product"("id_product") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_video_stats" ADD CONSTRAINT "users_video_stats_ref_id_product_fkey" FOREIGN KEY ("ref_id_product") REFERENCES "users_product"("id_product") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_interactions_vote" ADD CONSTRAINT "users_interactions_vote_ref_id_product_fkey" FOREIGN KEY ("ref_id_product") REFERENCES "users_product"("id_product") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_interactions_vote" ADD CONSTRAINT "users_interactions_vote_ref_id_sender_fkey" FOREIGN KEY ("ref_id_sender") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_interactions_comment" ADD CONSTRAINT "users_interactions_comment_ref_id_product_fkey" FOREIGN KEY ("ref_id_product") REFERENCES "users_product"("id_product") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_interactions_comment" ADD CONSTRAINT "users_interactions_comment_ref_id_sender_fkey" FOREIGN KEY ("ref_id_sender") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_interactions_bookmark" ADD CONSTRAINT "users_interactions_bookmark_ref_id_sender_fkey" FOREIGN KEY ("ref_id_sender") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_interactions_bookmark" ADD CONSTRAINT "users_interactions_bookmark_ref_id_product_fkey" FOREIGN KEY ("ref_id_product") REFERENCES "users_product"("id_product") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_interactions_followers" ADD CONSTRAINT "users_interactions_followers_ref_id_receiver_fkey" FOREIGN KEY ("ref_id_receiver") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_interactions_followers" ADD CONSTRAINT "users_interactions_followers_ref_id_sender_fkey" FOREIGN KEY ("ref_id_sender") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_interactions_report" ADD CONSTRAINT "users_interactions_report_ref_id_sender_fkey" FOREIGN KEY ("ref_id_sender") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_interactions_report" ADD CONSTRAINT "users_interactions_report_ref_id_receiver_fkey" FOREIGN KEY ("ref_id_receiver") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_interactions_report" ADD CONSTRAINT "users_interactions_report_ref_id_product_fkey" FOREIGN KEY ("ref_id_product") REFERENCES "users_product"("id_product") ON DELETE CASCADE ON UPDATE CASCADE;
