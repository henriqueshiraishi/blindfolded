class MQELEM < ApplicationRecord
  belongs_to :mqdiag
  enum tipo_elemento: [:State, :Condition]
  validates :descricao, presence: true, if: :State?
  validates :tipo_elemento, presence: true
  def self.tipo_elementos
    [ ['Estado', 'State'], ['Condição', 'Condition'] ]
  end
end
