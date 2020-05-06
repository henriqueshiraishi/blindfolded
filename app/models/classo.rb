class CLASSO < ApplicationRecord
  belongs_to :cldiag
  validates :clclas_origem_id,  presence: true
  validates :clclas_destino_id, presence: true
  validates :multi_origem,  presence: true, if:-> { UMLAssociation? }
  validates :multi_destino, presence: true, if:-> { UMLAssociation? }
  validates :tipo_associacao, presence: true
  enum tipo_associacao: [:UMLAggregation, :UMLAssociation, :UMLComposition, :UMLDependency, :UMLGeneralization, :UMLRealization]
  def self.associacoes
    [
      ['Agregação', 'UMLAggregation'],
      ['Associação', 'UMLAssociation'],
      ['Composicação', 'UMLComposition'],
      ['Depedência', 'UMLDependency'],
      ['Generalização', 'UMLGeneralization'],
      ['Realização', 'UMLRealization']
    ]
  end
end
