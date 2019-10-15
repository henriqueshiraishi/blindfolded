class CreateClasse < ActiveRecord::Migration[5.1]
  def change
    create_table :classe do |t|
      t.references :diagrama, foreign_key: true
      t.string :nome
      t.string :estereotipo

      t.timestamps
    end
  end
end
