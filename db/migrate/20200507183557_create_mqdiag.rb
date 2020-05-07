class CreateMQDIAG < ActiveRecord::Migration[5.1]
  def change
    create_table :mqdiag do |t|
      t.references :user, foreign_key: true
      t.string :nome
      t.integer :mqelem_inicial_id
      t.integer :mqelem_final_id

      t.timestamps
    end
  end
end
