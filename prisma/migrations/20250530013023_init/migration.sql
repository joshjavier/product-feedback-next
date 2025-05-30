-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "password" CHAR(60) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "avatar_url" VARCHAR(1000),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_user" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "pk_status" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "pk_category" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback_request" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "user_id" INTEGER,

    CONSTRAINT "pk_feedback_request" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "content" VARCHAR(250) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "feedback_request_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "parent_comment_id" INTEGER,
    "reply_to_user_id" INTEGER,

    CONSTRAINT "pk_comment" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "upvote" (
    "user_id" INTEGER NOT NULL,
    "feedback_request_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_upvote" PRIMARY KEY ("user_id","feedback_request_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unique_username" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "unique_feedback" ON "feedback_request"("title");

-- CreateIndex
CREATE INDEX "idx_feedback_by_status" ON "feedback_request"("status_id");

-- CreateIndex
CREATE INDEX "idx_feedback_by_category" ON "feedback_request"("category_id");

-- CreateIndex
CREATE INDEX "idx_comment_count" ON "comment"("feedback_request_id");

-- CreateIndex
CREATE INDEX "idx_comment_thread" ON "comment"("parent_comment_id");

-- CreateIndex
CREATE INDEX "idx_upvote_count" ON "upvote"("feedback_request_id");

-- AddForeignKey
ALTER TABLE "feedback_request" ADD CONSTRAINT "fk_status_feedback_request" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_request" ADD CONSTRAINT "fk_category_feedback_request" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_request" ADD CONSTRAINT "fk_user_feedback_request" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "fk_feedback_request_comment" FOREIGN KEY ("feedback_request_id") REFERENCES "feedback_request"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "fk_user_comment" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "fk_comment_reply" FOREIGN KEY ("parent_comment_id") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "fk_user_reply" FOREIGN KEY ("reply_to_user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "upvote" ADD CONSTRAINT "fk_user_upvote" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "upvote" ADD CONSTRAINT "fk_feedback_request_upvote" FOREIGN KEY ("feedback_request_id") REFERENCES "feedback_request"("id") ON DELETE CASCADE ON UPDATE CASCADE;
