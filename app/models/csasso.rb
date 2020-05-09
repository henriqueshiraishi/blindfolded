class CSASSO < ApplicationRecord
  belongs_to :csdiag
  validates :cselem_origem_id,  presence: true
  validates :cselem_destino_id, presence: true
  validates :tipo_associacao, presence: true
  enum tipo_associacao: [:UMLCommunication, :UMLInclude, :UMLExtend, :UMLGeneralization]
  def self.associacoes
    [
      ['Associação', 'UMLCommunication'],
      ['Inclusão', 'UMLInclude'],
      ['Extensão', 'UMLExtend'],
      ['Generalização', 'UMLGeneralization']
    ]
  end
end
