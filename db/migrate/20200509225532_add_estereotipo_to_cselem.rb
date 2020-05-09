class AddEstereotipoToCSELEM < ActiveRecord::Migration[5.1]
  def change
    add_column :cselem, :estereotipo, :string
  end
end
