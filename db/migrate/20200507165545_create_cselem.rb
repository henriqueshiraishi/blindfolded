class CreateCSELEM < ActiveRecord::Migration[5.1]
  def change
    create_table :cselem do |t|
      t.references :csdiag, foreign_key: true
      t.string :descricao
      t.integer :tipo_elemento, default: 0

      t.timestamps
    end
  end
end
