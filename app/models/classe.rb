class Classe < ApplicationRecord
  belongs_to :diagrama
  has_many :atributo, :dependent => :destroy
  has_many :metodo, :dependent => :destroy
  has_many :associacao, :dependent => :destroy
  accepts_nested_attributes_for :atributo, allow_destroy: true
  accepts_nested_attributes_for :metodo, allow_destroy: true
  accepts_nested_attributes_for :associacao, allow_destroy: true
  validates_associated :atributo
  validates_associated :metodo
  validates_associated :associacao
  validates :nome, presence: true
  after_destroy :remove_dependencias
  private
    def remove_dependencias
      Atributo.where(classe_id: id).delete_all
      Metodo.where(classe_id: id).delete_all
      Associacao.where(classe_id: id).delete_all
      Associacao.where(classe_destino: id).delete_all
    end
end
