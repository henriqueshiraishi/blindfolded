# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20200510021901) do

  create_table "classo", force: :cascade do |t|
    t.integer "cldiag_id"
    t.integer "clclas_origem_id"
    t.integer "clclas_destino_id"
    t.string "multi_origem"
    t.string "multi_destino"
    t.integer "tipo_associacao", default: 0
    t.string "estereotipo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cldiag_id"], name: "index_classo_on_cldiag_id"
  end

  create_table "clatri", force: :cascade do |t|
    t.integer "clclas_id"
    t.string "descricao"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["clclas_id"], name: "index_clatri_on_clclas_id"
  end

  create_table "clclas", force: :cascade do |t|
    t.integer "cldiag_id"
    t.string "nome"
    t.string "estereotipo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cldiag_id"], name: "index_clclas_on_cldiag_id"
  end

  create_table "cldiag", force: :cascade do |t|
    t.integer "user_id"
    t.string "nome"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_cldiag_on_user_id"
  end

  create_table "clmeto", force: :cascade do |t|
    t.integer "clclas_id"
    t.string "descricao"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["clclas_id"], name: "index_clmeto_on_clclas_id"
  end

  create_table "csasso", force: :cascade do |t|
    t.integer "csdiag_id"
    t.integer "cselem_origem_id"
    t.integer "cselem_destino_id"
    t.integer "tipo_associacao"
    t.string "estereotipo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["csdiag_id"], name: "index_csasso_on_csdiag_id"
  end

  create_table "csdiag", force: :cascade do |t|
    t.integer "user_id"
    t.string "nome"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_csdiag_on_user_id"
  end

  create_table "cselem", force: :cascade do |t|
    t.integer "csdiag_id"
    t.string "descricao"
    t.integer "tipo_elemento", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "estereotipo"
    t.index ["csdiag_id"], name: "index_cselem_on_csdiag_id"
  end

  create_table "mqdiag", force: :cascade do |t|
    t.integer "user_id"
    t.string "nome"
    t.integer "mqelem_inicial_id"
    t.integer "mqelem_final_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_mqdiag_on_user_id"
  end

  create_table "mqelem", force: :cascade do |t|
    t.integer "mqdiag_id"
    t.string "descricao"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "estereotipo"
    t.index ["mqdiag_id"], name: "index_mqelem_on_mqdiag_id"
  end

  create_table "mqtran", force: :cascade do |t|
    t.integer "mqdiag_id"
    t.integer "mqelem_origem_id"
    t.integer "mqelem_destino_id"
    t.string "descricao"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "estereotipo"
    t.index ["mqdiag_id"], name: "index_mqtran_on_mqdiag_id"
  end

  create_table "user", force: :cascade do |t|
    t.string "username", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["reset_password_token"], name: "index_user_on_reset_password_token", unique: true
    t.index ["username"], name: "index_user_on_username", unique: true
  end

end
