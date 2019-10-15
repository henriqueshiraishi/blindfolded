class ClassDiagram::Metodo < ApplicationRecord
  belongs_to :class_diagram_classe, class_name: 'ClassDiagram::Classe'
  validates :descricao, presence: true
end
