class MQELEM < ApplicationRecord
  belongs_to :mqdiag
  enum tipo_elemento: [:State, :Condition]
  validates :descricao, presence: true, if: :State?
  validates :tipo_elemento, presence: true
  def self.tipo_elementos
    [ ['Estado', 'State'], ['Condição', 'Condition'] ]
  end
  before_destroy :remove_dependencias
  private
  def remove_dependencias
    MQTRAN.where(mqelem_origem_id:  id).delete_all
    MQTRAN.where(mqelem_destino_id: id).delete_all
  end
end
