class MQDIAG < ApplicationRecord
  belongs_to :user
  has_many :mqelem
  has_many :mqtran, :dependent => :destroy
  accepts_nested_attributes_for :mqtran, allow_destroy: true
  validates_associated :mqtran
  validates :nome, presence: true
  before_validation :set_user
  before_destroy :remove_dependencias
  private
  def set_user
    self.user_id = Current.user.id
  end
  def remove_dependencias
    MQTRAN.where(mqdiag_id: id).delete_all
    MQELEM.where(mqdiag_id: id).delete_all
  end
end
