class CreateCSASSO < ActiveRecord::Migration[5.1]
  def change
    create_table :csasso do |t|
      t.references :csdiag, foreign_key: true
      t.integer :cselem_origem_id
      t.integer :cselem_destino_id
      t.integer :tipo_associacao
      t.string :estereotipo

      t.timestamps
    end
  end
end
