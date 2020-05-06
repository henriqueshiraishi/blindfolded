class CreateCLATRI < ActiveRecord::Migration[5.1]
  def change
    create_table :clatri do |t|
      t.references :clclas, foreign_key: true
      t.string :descricao

      t.timestamps
    end
  end
end
