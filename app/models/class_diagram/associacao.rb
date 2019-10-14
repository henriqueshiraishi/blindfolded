class ClassDiagram::Associacao < ApplicationRecord
  belongs_to :class_diagram_classe
  validates :classe_destino, presence: true
  validates :tipo_associacao, presence: true
  validates :multi_a, presence: true, if:-> { UMLAssociation? }
  validates :multi_b, presence: true, if:-> { UMLAssociation? }
  enum tipo_associacao: [:UMLAggregation, :UMLAssociation, :UMLComposition, :UMLDependency, :UMLGeneralization, :UMLRealization]
end
