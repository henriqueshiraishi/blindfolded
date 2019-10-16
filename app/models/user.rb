class User < ApplicationRecord
  has_many :class_diagram_diagrama
  devise :database_authenticatable, :registerable#, :validatable
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 3 }, if: :force_password?
  validates_confirmation_of :password
  def force_password?
    self.id.blank?
  end
end
