class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, :omniauth_providers => [:twitter]
  validates :username, presence: true
  
  
  
  
  def self.find_for_oauth(auth)
    user = User.where(uid: auth.uid, provider: auth.provider).first
    unless user
      user = User.create(
        uid: auth.uid,
        provider: auth.provider,
        username: auth.info.name,
        screen_name: auth.info.nickname,
        email: User.get_email(auth),
        password: Devise.friendly_token[6, 128])
    end
    user
  end
  
  private
    def self.get_email(auth)
      email = auth.info.email
      email = "#{auth.provider}-#{auth.uid}@example.com" if email.blank?
      email
    end
  
  #def self.from_omniauth(auth)
  #  where(provider: auth.provider, uid: auth.uid).first_or_create.tap do |user|
  #    user.username = auth.info.nickname # twitterで利用している名前が入る
  #    user.email = auth.info.email # twitterの場合入らない
  #  end
  #end
  
  #def self.new_with_session(params, session)
  #  if session["devise.user_attributes"]
  #    new(session["devise.user_attributes"], without_protection: true) do |user|
  #      user.attributes = params
  #      user.valid?
  #    end
  #  else
  #    super
  #  end
  #end
  
  def password_required?
    super && provider.blank?
  end
  
  #def self.create_unique_string
  #  SecureRandom.uuid
  #end
  
end
