class CLDIAG < ApplicationRecord
  belongs_to :user
  has_many :clclas
  has_many :classo, :dependent => :destroy
  accepts_nested_attributes_for :classo, allow_destroy: true
  validates_associated :classo
  validates :nome, presence: true
  before_validation :set_user
  before_destroy :remove_dependencias
  private
  def set_user
    self.user_id = Current.user.id
  end
  def remove_dependencias
    CLASSO.where(cldiag_id: id).delete_all
    CLCLAS.where(cldiag_id: id).each do |clclas|
      CLATRI.where(clclas_id: clclas.id).delete_all
      CLMETO.where(clclas_id: clclas.id).delete_all
      clclas.delete
    end
  end
end
