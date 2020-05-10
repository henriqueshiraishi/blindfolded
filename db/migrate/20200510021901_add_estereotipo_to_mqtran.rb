class AddEstereotipoToMQTRAN < ActiveRecord::Migration[5.1]
  def change
    add_column :mqtran, :estereotipo, :string
  end
end
