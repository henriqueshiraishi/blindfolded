class ClassDiagram::Diagrama < ApplicationRecord
  belongs_to :user
  has_many :class_diagram_classe
  validates :nome, presence: true
  before_validation :set_user
  after_destroy :remove_dependencias
  private
  def set_user
    self.user_id = Current.user.id
  end
  def remove_dependencias
    ClassDiagram::Classe.where(class_diagram_diagrama_id: id).delete_all
  end
end
