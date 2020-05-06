class CreateCLCLAS < ActiveRecord::Migration[5.1]
  def change
    create_table :clclas do |t|
      t.references :cldiag, foreign_key: true
      t.string :nome
      t.string :estereotipo

      t.timestamps
    end
  end
end
