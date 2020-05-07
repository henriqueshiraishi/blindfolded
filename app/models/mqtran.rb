class MQTRAN < ApplicationRecord
  belongs_to :mqdiag
  validates :mqelem_origem_id,  presence: true
  validates :mqelem_destino_id, presence: true
end
