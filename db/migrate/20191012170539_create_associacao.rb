class CreateAssociacao < ActiveRecord::Migration[5.1]
  def change
    create_table :associacao do |t|
      t.references :classe, foreign_key: true
      t.integer :classe_destino
      t.integer :tipo_associacao, default: 0
      t.string :multi_a
      t.string :multi_b
      t.string :estereotipo

      t.timestamps
    end
  end
end
