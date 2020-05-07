class CreateMQTRAN < ActiveRecord::Migration[5.1]
  def change
    create_table :mqtran do |t|
      t.references :mqdiag, foreign_key: true
      t.integer :mqelem_origem_id
      t.integer :mqelem_destino_id
      t.string :descricao

      t.timestamps
    end
  end
end
