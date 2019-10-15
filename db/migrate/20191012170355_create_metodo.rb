class CreateMetodo < ActiveRecord::Migration[5.1]
  def change
    create_table :metodo do |t|
      t.references :classe, foreign_key: true
      t.string :descricao

      t.timestamps
    end
  end
end
