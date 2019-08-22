class User < ApplicationRecord
  devise :database_authenticatable, :registerable
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 3 }, if: :force_password?
  def force_password?
    self.id.blank?
  end
end
