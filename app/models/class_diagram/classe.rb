class ClassDiagram::Classe < ApplicationRecord
  belongs_to :class_diagram_diagrama
  has_many :class_diagram_atributo
  has_many :class_diagram_metodo
  has_many :class_diagram_associacao
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
