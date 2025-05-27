import { useState, useEffect } from 'react';
import { GetVehicleSimpleListAPI } from '../../../apis/vehicle_api';
import type { SimpleVehicleItemEntity } from '../../../models/entity/vehicle_entity';

/**
 * # 车辆选择模态框组件属性接口
 */
interface VehicleSelectModalProps {
    /** 是否显示模态框 */
    show: boolean;
    /** 已选择的车辆UUID */
    selectedVehicleUuid?: string;
    /** 确认选择回调函数 */
    onConfirm: (vehicle: SimpleVehicleItemEntity) => void;
    /** 取消选择回调函数 */
    onCancel: () => void;
}

/**
 * # 车辆选择模态框组件
 * 用于选择车辆的模态框，支持搜索和筛选
 * @param props - 组件属性
 * @returns 车辆选择模态框组件
 */
export function VehicleSelectModal({ show, selectedVehicleUuid, onConfirm, onCancel }: VehicleSelectModalProps) {
    const [vehicles, setVehicles] = useState<SimpleVehicleItemEntity[]>([]);
    const [filteredVehicles, setFilteredVehicles] = useState<SimpleVehicleItemEntity[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentVehicle, setCurrentVehicle] = useState<SimpleVehicleItemEntity | null>(null);

    /**
     * 获取车辆简易列表
     */
    const fetchVehicles = async () => {
        setLoading(true);
        try {
            console.log('🔍 获取车辆简易列表');
            const response = await GetVehicleSimpleListAPI();
            console.log('📋 车辆简易列表响应:', response);
            
            if (response?.code === 200) {
                const vehicleList = response.data?.list || [];
                console.log(`✅ 获取到 ${vehicleList.length} 条车辆记录`);
                setVehicles(vehicleList);
                setFilteredVehicles(vehicleList);
            } else {
                console.error('❌ 获取车辆简易列表失败:', response?.message);
                alert(`获取车辆列表失败: ${response?.message || '未知错误'} (代码: ${response?.code})`);
            }
        } catch (error) {
            console.error('💥 获取车辆简易列表异常:', error);
            alert('获取车辆列表失败，请稍后重试。详情请查看控制台');
        } finally {
            setLoading(false);
        }
    };

    /**
     * 搜索过滤车辆
     */
    const handleSearch = (term: string) => {
        setSearchTerm(term);
        if (!term.trim()) {
            setFilteredVehicles(vehicles);
            return;
        }
        
        const filtered = vehicles.filter(vehicle => 
            vehicle.plate_number?.toLowerCase().includes(term.toLowerCase()) ||
            vehicle.model?.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredVehicles(filtered);
    };

    /**
     * 选择车辆
     */
    const handleSelectVehicle = (vehicle: SimpleVehicleItemEntity) => {
        setCurrentVehicle(vehicle);
    };

    /**
     * 确认选择
     */
    const handleConfirm = () => {
        if (currentVehicle) {
            onConfirm(currentVehicle);
        }
    };

    /**
     * 重置状态
     */
    const resetState = () => {
        setSearchTerm('');
        setCurrentVehicle(null);
        setFilteredVehicles(vehicles);
    };

    // 组件挂载时获取数据
    useEffect(() => {
        if (show) {
            fetchVehicles();
        } else {
            resetState();
        }
    }, [show]);

    // 搜索处理
    useEffect(() => {
        handleSearch(searchTerm);
    }, [searchTerm, vehicles]);

    // 设置已选择的车辆
    useEffect(() => {
        if (selectedVehicleUuid && vehicles.length > 0) {
            const selected = vehicles.find(v => v.vehicle_uuid === selectedVehicleUuid);
            if (selected) {
                setCurrentVehicle(selected);
            }
        }
    }, [selectedVehicleUuid, vehicles]);

    if (!show) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box max-w-4xl">
                {/* 模态框标题 */}
                <h3 className="font-bold text-lg mb-4">
                    <span className="text-xl mr-2">🚌</span>
                    选择车辆
                </h3>

                {/* 搜索框 */}
                <div className="form-control mb-4">
                    <div className="input-group">
                        <input 
                            type="text"
                            placeholder="搜索车牌号或车型..."
                            className="input input-bordered flex-1"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-square">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* 车辆列表 */}
                <div className="max-h-96 overflow-y-auto border rounded-lg">
                    {loading ? (
                        <div className="flex justify-center items-center py-8">
                            <span className="loading loading-spinner loading-md text-primary"></span>
                            <span className="ml-2">加载中...</span>
                        </div>
                    ) : filteredVehicles.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="text-4xl mb-2">🔍</div>
                            <p className="text-base-content/60">
                                {searchTerm ? '未找到匹配的车辆' : '暂无车辆数据'}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-1 p-2">
                            {filteredVehicles.map((vehicle) => (
                                <div 
                                    key={vehicle.vehicle_uuid}
                                    className={`card card-compact cursor-pointer transition-all hover:shadow-md ${
                                        currentVehicle?.vehicle_uuid === vehicle.vehicle_uuid 
                                            ? 'bg-primary/10 border-primary' 
                                            : 'bg-base-100 hover:bg-base-200'
                                    } border`}
                                    onClick={() => handleSelectVehicle(vehicle)}
                                >
                                    <div className="card-body">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="text-2xl">🚌</div>
                                                <div>
                                                    <h4 className="font-semibold text-base">
                                                        {vehicle.plate_number}
                                                    </h4>
                                                    <p className="text-sm text-base-content/60">
                                                        {vehicle.model}
                                                    </p>
                                                </div>
                                            </div>
                                            {currentVehicle?.vehicle_uuid === vehicle.vehicle_uuid && (
                                                <div className="badge badge-primary">已选择</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 已选择车辆信息 */}
                {currentVehicle && (
                    <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                        <div className="flex items-center space-x-2">
                            <span className="text-lg">✅</span>
                            <span className="font-medium">已选择：</span>
                            <span className="font-semibold text-primary">
                                {currentVehicle.plate_number}
                            </span>
                            <span className="text-base-content/60">
                                ({currentVehicle.model})
                            </span>
                        </div>
                    </div>
                )}

                {/* 操作按钮 */}
                <div className="modal-action">
                    <button 
                        className="btn btn-ghost"
                        onClick={onCancel}
                    >
                        取消
                    </button>
                    <button 
                        className="btn btn-primary"
                        onClick={handleConfirm}
                        disabled={!currentVehicle}
                    >
                        确认选择
                    </button>
                </div>
            </div>
            <div className="modal-backdrop" onClick={onCancel}></div>
        </div>
    );
} 