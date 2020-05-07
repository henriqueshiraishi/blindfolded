class CreateCSDIAG < ActiveRecord::Migration[5.1]
  def change
    create_table :csdiag do |t|
      t.references :user, foreign_key: true
      t.string :nome

      t.timestamps
    end
  end
end
