# -*- mode: ruby -*-
# vi: set ft=ruby :

# バージョン2形式で、仮想マシンの定義を開始
Vagrant.configure(2) do |config|
  # VirtualBoxの設定
  config.vm.provider :virtualbox do |v|
    v.name = "自分で設定"
    v.customize ["modifyvm", :id, "--memory", 2048]
    v.customize ["modifyvm", :id, "--cableconnected1", "on"]
      # GUIを表示
      # v.gui = true
  end
  # ボックス(OS)
  config.vm.box = "bento/centos-6.7"
  config.vm.box_version = "2.2.7"
  # ホスト名
  config.vm.hostname = "自分で設定"
  # 仮想マシンに静的IPアドレスを割り当て
  config.vm.network "private_network", ip: "192.168.33.10"
  # ポートフォワーディング
  config.vm.network "forwarded_port", guest: 80, host: 8080
  # ホストOSのディレクトリから、仮想マシン上のディレクトリへの一方向の同期を設定
  config.vm.synced_folder ".", "/var/www/", type: "rsync",
    rsync__exclude: [".git/", ".vagrant/", "node_modules/"],
    rsync__auto: true
  config.vm.synced_folder "./ansiblefiles", "/vagrant/ansiblefiles/", type: "rsync",
    rsync__auto: true
  # ansible_localを使い、プロビジョニングを実行
  # vagrant up, vagrant provision実行時のみ通るようにする
  if ARGV[0] == "up" || ARGV[0] == "provision" then
    config.vm.provision "ansible_local" do |ansible|
      ansible.install_mode = "default"
      ansible.inventory_path = "./ansiblefiles/inventories/local.ini"
      ansible.playbook = "./ansiblefiles/site.yml"
      ansible.limit = 'webservers'
    end
  end
# 仮想マシンの定義を終了
end
