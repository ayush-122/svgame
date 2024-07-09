-- CreateEnum
CREATE TYPE "AuditType" AS ENUM ('SPIN', 'KENO', 'FEATURE_KENO', 'CASCADE', 'WAYS', 'USER_ADDED');

-- CreateTable
CREATE TABLE "request_log" (
    "id" SERIAL NOT NULL,
    "client_ip" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "method" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "user_agent" TEXT NOT NULL,
    "status_code" INTEGER NOT NULL,
    "content_length" INTEGER,
    "response_time" DOUBLE PRECISION,
    "protocol" TEXT,
    "path" TEXT,
    "query" JSONB,
    "request_body" JSONB,
    "request_params" JSONB,
    "request_query" JSONB,

    CONSTRAINT "request_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "players" (
    "player_id" BIGSERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "fullname" TEXT,
    "password" TEXT NOT NULL,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "wallet_id" TEXT NOT NULL,

    CONSTRAINT "players_pkey" PRIMARY KEY ("player_id")
);

-- CreateTable
CREATE TABLE "wallets" (
    "wallet_id" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "last_updated" TIMESTAMP(3) NOT NULL,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("wallet_id")
);

-- CreateTable
CREATE TABLE "wallet_transactions" (
    "wallet_log_id" BIGSERIAL NOT NULL,
    "wallet_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "current_balance" DOUBLE PRECISION NOT NULL,
    "transaction_type" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL,
    "client_ip_address" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "audit_type" "AuditType" NOT NULL,
    "audit_id" BIGINT NOT NULL,

    CONSTRAINT "wallet_transactions_pkey" PRIMARY KEY ("wallet_log_id")
);

-- CreateTable
CREATE TABLE "spin_audits" (
    "spin_id" BIGSERIAL NOT NULL,
    "spin_request_id" BIGINT,
    "game_type" TEXT NOT NULL,
    "client_ip_address" TEXT NOT NULL,
    "player_id" BIGINT NOT NULL,
    "game_id" INTEGER NOT NULL,
    "current_state" TEXT,
    "next_state" TEXT,
    "current_free_spin" INTEGER NOT NULL,
    "total_free_spin" INTEGER NOT NULL,
    "raw_request" JSONB NOT NULL,
    "raw_response" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isCompleted" BOOLEAN NOT NULL,

    CONSTRAINT "spin_audits_pkey" PRIMARY KEY ("spin_id")
);

-- CreateTable
CREATE TABLE "keno_audits" (
    "keno_id" BIGSERIAL NOT NULL,
    "client_ip_address" TEXT NOT NULL,
    "credits" DOUBLE PRECISION NOT NULL,
    "bet" INTEGER NOT NULL,
    "risk_level" TEXT NOT NULL,
    "bet_numbers" INTEGER[],
    "player_id" BIGINT NOT NULL,
    "game_id" INTEGER NOT NULL,
    "win_multiplier" DOUBLE PRECISION NOT NULL,
    "total_won" DOUBLE PRECISION NOT NULL,
    "raw_response" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isCompleted" BOOLEAN NOT NULL,

    CONSTRAINT "keno_audits_pkey" PRIMARY KEY ("keno_id")
);

-- CreateTable
CREATE TABLE "feature_keno_audits" (
    "feature_keno_id" BIGSERIAL NOT NULL,
    "feature_keno_request_id" BIGINT,
    "client_ip_address" TEXT NOT NULL,
    "current_state" TEXT NOT NULL,
    "next_state" TEXT NOT NULL,
    "number_count" INTEGER NOT NULL,
    "next_state_details" JSONB NOT NULL,
    "credits" DOUBLE PRECISION NOT NULL,
    "bet" INTEGER NOT NULL,
    "total_bet" INTEGER NOT NULL,
    "extra_draw_count" INTEGER NOT NULL,
    "bet_numbers" INTEGER[],
    "drawn_numbers" INTEGER[],
    "win_numbers" INTEGER[],
    "feature_symbols" TEXT[],
    "feature_symbol_hit" JSONB NOT NULL,
    "bonus_multiplier" INTEGER NOT NULL,
    "player_id" BIGINT NOT NULL,
    "game_id" INTEGER NOT NULL,
    "win" DOUBLE PRECISION NOT NULL,
    "payout_multiplier" DOUBLE PRECISION NOT NULL,
    "total_won" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isCompleted" BOOLEAN NOT NULL,

    CONSTRAINT "feature_keno_audits_pkey" PRIMARY KEY ("feature_keno_id")
);

-- CreateTable
CREATE TABLE "games" (
    "game_id" INTEGER NOT NULL,
    "game_name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("game_id")
);

-- CreateTable
CREATE TABLE "qa_test" (
    "qa_test_id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "player_id" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "qa_test_pkey" PRIMARY KEY ("qa_test_id")
);

-- CreateTable
CREATE TABLE "cascade_audits" (
    "cascade_id" BIGSERIAL NOT NULL,
    "cascade_request_id" BIGINT,
    "client_ip_address" TEXT NOT NULL,
    "player_id" BIGINT NOT NULL,
    "game_id" INTEGER NOT NULL,
    "current_state" TEXT,
    "next_state" TEXT,
    "current_free_spin" INTEGER NOT NULL,
    "total_free_spin" INTEGER NOT NULL,
    "current_cascade" INTEGER NOT NULL,
    "total_cascades" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isCompleted" BOOLEAN NOT NULL,
    "base_bet" INTEGER NOT NULL,
    "credit_value" INTEGER NOT NULL,
    "bet_multiplier" INTEGER NOT NULL,
    "reel_mode" INTEGER NOT NULL,
    "matrix" JSONB NOT NULL,
    "payline" JSONB NOT NULL,
    "star_positions" JSONB NOT NULL,
    "cascading_win_progress" JSONB NOT NULL,
    "star" JSONB NOT NULL,
    "free_game" JSONB NOT NULL,
    "main_spin_credits_won" INTEGER NOT NULL,
    "credits_won_on_base_spin" INTEGER NOT NULL,
    "base_game_cascade_won" INTEGER NOT NULL,
    "free_spin_credits_won" INTEGER NOT NULL,
    "free_game_cascade_won" INTEGER NOT NULL,
    "free_spin_total_won" INTEGER NOT NULL,
    "total_credits_won" INTEGER NOT NULL,
    "credits_wagered" INTEGER NOT NULL,
    "final_winnings" JSONB NOT NULL,
    "cascade_progress" INTEGER NOT NULL,
    "last_cascading_reels" INTEGER NOT NULL,

    CONSTRAINT "cascade_audits_pkey" PRIMARY KEY ("cascade_id")
);

-- CreateTable
CREATE TABLE "ways_audits" (
    "ways_id" BIGSERIAL NOT NULL,
    "ways_request_id" BIGINT,
    "game_type" TEXT NOT NULL,
    "client_ip_address" TEXT NOT NULL,
    "player_id" BIGINT NOT NULL,
    "game_id" INTEGER NOT NULL,
    "current_state" TEXT,
    "next_state" TEXT,
    "current_free_ways" INTEGER NOT NULL,
    "total_free_ways" INTEGER NOT NULL,
    "raw_request" JSONB NOT NULL,
    "raw_response" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isCompleted" BOOLEAN NOT NULL,

    CONSTRAINT "ways_audits_pkey" PRIMARY KEY ("ways_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "players_username_key" ON "players"("username");

-- CreateIndex
CREATE UNIQUE INDEX "players_wallet_id_key" ON "players"("wallet_id");

-- CreateIndex
CREATE INDEX "audit_index" ON "wallet_transactions"("audit_type", "audit_id");

-- CreateIndex
CREATE UNIQUE INDEX "spin_audits_spin_id_key" ON "spin_audits"("spin_id");

-- CreateIndex
CREATE UNIQUE INDEX "keno_audits_keno_id_key" ON "keno_audits"("keno_id");

-- CreateIndex
CREATE UNIQUE INDEX "feature_keno_audits_feature_keno_id_key" ON "feature_keno_audits"("feature_keno_id");

-- CreateIndex
CREATE UNIQUE INDEX "qa_test_qa_test_id_key" ON "qa_test"("qa_test_id");

-- CreateIndex
CREATE UNIQUE INDEX "cascade_audits_cascade_id_key" ON "cascade_audits"("cascade_id");

-- CreateIndex
CREATE UNIQUE INDEX "ways_audits_ways_id_key" ON "ways_audits"("ways_id");

-- AddForeignKey
ALTER TABLE "players" ADD CONSTRAINT "players_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("wallet_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallet_transactions" ADD CONSTRAINT "wallet_transactions_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("wallet_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spin_audits" ADD CONSTRAINT "spin_audits_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("player_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spin_audits" ADD CONSTRAINT "spin_audits_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("game_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "keno_audits" ADD CONSTRAINT "keno_audits_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("player_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "keno_audits" ADD CONSTRAINT "keno_audits_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("game_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feature_keno_audits" ADD CONSTRAINT "feature_keno_audits_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("player_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feature_keno_audits" ADD CONSTRAINT "feature_keno_audits_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("game_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cascade_audits" ADD CONSTRAINT "cascade_audits_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("player_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cascade_audits" ADD CONSTRAINT "cascade_audits_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("game_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ways_audits" ADD CONSTRAINT "ways_audits_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("player_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ways_audits" ADD CONSTRAINT "ways_audits_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("game_id") ON DELETE RESTRICT ON UPDATE CASCADE;
