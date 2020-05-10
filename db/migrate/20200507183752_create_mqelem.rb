class CreateMQELEM < ActiveRecord::Migration[5.1]
  def change
    create_table :mqelem do |t|
      t.references :mqdiag, foreign_key: true
      t.string :descricao

      t.timestamps
    end
  end
end
