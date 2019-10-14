class ClassDiagram::Atributo < ApplicationRecord
  belongs_to :class_diagram_classe
  validates :descricao, presence: true
end
