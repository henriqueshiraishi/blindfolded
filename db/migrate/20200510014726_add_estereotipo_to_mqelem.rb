class AddEstereotipoToMQELEM < ActiveRecord::Migration[5.1]
  def change
    add_column :mqelem, :estereotipo, :string
  end
end
