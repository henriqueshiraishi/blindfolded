class Associacao < ApplicationRecord
  belongs_to :classe
  validates :classe_destino, presence: true
  validates :tipo_associacao, presence: true
  validates :multi_a, presence: true, if:-> { UMLAssociation? }
  validates :multi_b, presence: true, if:-> { UMLAssociation? }
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
