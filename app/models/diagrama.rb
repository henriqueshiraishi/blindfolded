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
    Classe.where(diagrama_id: id).delete_all
  end
end
