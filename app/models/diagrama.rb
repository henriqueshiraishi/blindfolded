class Diagrama < ApplicationRecord
  belongs_to :user
  has_many :classe
  validates :nome, presence: true
  before_validation :set_user
  before_destroy :remove_dependencias
  private
  def set_user
    self.user_id = Current.user.id
  end
  def remove_dependencias
    Classe.where(diagrama_id: id).each do |classe|
      Atributo.where(classe_id: classe.id).delete_all
      Metodo.where(classe_id: classe.id).delete_all
      Associacao.where(classe_id: classe.id).delete_all
      classe.delete
    end
  end
end
