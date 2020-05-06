class CreateCLASSO < ActiveRecord::Migration[5.1]
  def change
    create_table :classo do |t|
      t.references :cldiag, foreign_key: true
      t.integer :clclas_origem_id
      t.integer :clclas_destino_id
      t.string :multi_origem
      t.string :multi_destino
      t.integer :tipo_associacao, default: 0
      t.string :estereotipo

      t.timestamps
    end
  end
end
