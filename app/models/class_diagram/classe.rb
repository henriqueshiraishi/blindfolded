class ClassDiagram::Classe < ApplicationRecord
  belongs_to :class_diagram_diagrama, class_name: 'ClassDiagram::Diagrama'
  has_many :class_diagram_atributo, class_name: 'ClassDiagram::Atributo'
  has_many :class_diagram_metodo, class_name: 'ClassDiagram::Metodo'
  has_many :class_diagram_associacao, class_name: 'ClassDiagram::Associacao'
  validates :nome, presence: true
  after_destroy :remove_dependencias
  private
    def remove_dependencias
      ClassDiagram::Atributo.where(class_diagram_classe_id: id).delete_all
      ClassDiagram::Metodo.where(class_diagram_classe_id: id).delete_all
      ClassDiagram::Associacao.where(class_diagram_classe_id: id).delete_all
      ClassDiagram::Associacao.where(classe_destino: id).delete_all
    end
end
