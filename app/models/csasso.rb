class CSASSO < ApplicationRecord
  belongs_to :csdiag
  validates :cselem_origem_id,  presence: true
  validates :cselem_destino_id, presence: true
  validates :tipo_associacao, presence: true
  enum tipo_associacao: [:Association, :Inclusion, :Extension, :Generalization]
  def self.associacoes
    [
      ['Associação', 'Association'],
      ['Inclusão', 'Inclusion'],
      ['Extensão', 'Extension'],
      ['Generalização', 'Generalization']
    ]
  end
end
