class CSDIAG < ApplicationRecord
  belongs_to :user
  has_many :cselem
  has_many :csasso, :dependent => :destroy
  accepts_nested_attributes_for :csasso, allow_destroy: true
  validates_associated :csasso
  validates :nome, presence: true
  before_validation :set_user
  before_destroy :remove_dependencias
  private
  def set_user
    self.user_id = Current.user.id
  end
  def remove_dependencias
    CSASSO.where(csdiag_id: id).delete_all
    CSELEM.where(csdiag_id: id).delete_all
  end
end
