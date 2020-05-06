class CLCLAS < ApplicationRecord
  belongs_to :cldiag
  has_many :clatri, :dependent => :destroy
  has_many :clmeto, :dependent => :destroy
  accepts_nested_attributes_for :clatri, allow_destroy: true
  accepts_nested_attributes_for :clmeto, allow_destroy: true
  validates_associated :clatri
  validates_associated :clmeto
  validates :nome, presence: true
  before_destroy :remove_dependencias
  private
    def remove_dependencias
      CLATRI.where(clclas_id: id).delete_all
      CLMETO.where(clclas_id: id).delete_all
      CLASSO.where(clclas_origem_id:  id).delete_all
      CLASSO.where(clclas_destino_id: id).delete_all
    end
end
