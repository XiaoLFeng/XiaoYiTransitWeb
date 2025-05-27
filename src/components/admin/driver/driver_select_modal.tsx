import { useState, useEffect } from 'react';
import { GetDriverSimpleListAPI } from '../../../apis/driver_api';
import type { SimpleDriverItemEntity } from '../../../models/entity/driver_entity';

/**
 * # 司机选择模态框组件属性接口
 */
interface DriverSelectModalProps {
    /** 是否显示模态框 */
    show: boolean;
    /** 已选择的司机UUID */
    selectedDriverUuid?: string;
    /** 确认选择回调函数 */
    onConfirm: (driver: SimpleDriverItemEntity) => void;
    /** 取消选择回调函数 */
    onCancel: () => void;
}

/**
 * # 司机选择模态框组件
 * 用于选择司机的模态框，支持搜索和筛选
 * @param props - 组件属性
 * @returns 司机选择模态框组件
 */
export function DriverSelectModal({ show, selectedDriverUuid, onConfirm, onCancel }: DriverSelectModalProps) {
    const [drivers, setDrivers] = useState<SimpleDriverItemEntity[]>([]);
    const [filteredDrivers, setFilteredDrivers] = useState<SimpleDriverItemEntity[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentDriver, setCurrentDriver] = useState<SimpleDriverItemEntity | null>(null);

    /**
     * 获取司机简易列表
     */
    const fetchDrivers = async () => {
        setLoading(true);
        try {
            console.log('🔍 获取司机简易列表');
            const response = await GetDriverSimpleListAPI();
            console.log('📋 司机简易列表响应:', response);
            
            if (response?.code === 200) {
                const driverList = response.data?.list || [];
                console.log(`✅ 获取到 ${driverList.length} 条司机记录`);
                setDrivers(driverList);
                setFilteredDrivers(driverList);
            } else {
                console.error('❌ 获取司机简易列表失败:', response?.message);
                alert(`获取司机列表失败: ${response?.message || '未知错误'} (代码: ${response?.code})`);
            }
        } catch (error) {
            console.error('💥 获取司机简易列表异常:', error);
            alert('获取司机列表失败，请稍后重试。详情请查看控制台');
        } finally {
            setLoading(false);
        }
    };

    /**
     * 搜索过滤司机
     */
    const handleSearch = (term: string) => {
        setSearchTerm(term);
        if (!term.trim()) {
            setFilteredDrivers(drivers);
            return;
        }
        
        const filtered = drivers.filter(driver => 
            driver.employee_id?.toLowerCase().includes(term.toLowerCase()) ||
            driver.name?.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredDrivers(filtered);
    };

    /**
     * 选择司机
     */
    const handleSelectDriver = (driver: SimpleDriverItemEntity) => {
        setCurrentDriver(driver);
    };

    /**
     * 确认选择
     */
    const handleConfirm = () => {
        if (currentDriver) {
            onConfirm(currentDriver);
        }
    };

    /**
     * 重置状态
     */
    const resetState = () => {
        setSearchTerm('');
        setCurrentDriver(null);
        setFilteredDrivers(drivers);
    };

    // 组件挂载时获取数据
    useEffect(() => {
        if (show) {
            fetchDrivers();
        } else {
            resetState();
        }
    }, [show]);

    // 搜索处理
    useEffect(() => {
        handleSearch(searchTerm);
    }, [searchTerm, drivers]);

    // 设置已选择的司机
    useEffect(() => {
        if (selectedDriverUuid && drivers.length > 0) {
            const selected = drivers.find(d => d.driver_uuid === selectedDriverUuid);
            if (selected) {
                setCurrentDriver(selected);
            }
        }
    }, [selectedDriverUuid, drivers]);

    if (!show) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box max-w-4xl">
                {/* 模态框标题 */}
                <h3 className="font-bold text-lg mb-4">
                    <span className="text-xl mr-2">👨‍💼</span>
                    选择司机
                </h3>

                {/* 搜索框 */}
                <div className="form-control mb-4">
                    <div className="input-group">
                        <input 
                            type="text"
                            placeholder="搜索工号或姓名..."
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

                {/* 司机列表 */}
                <div className="max-h-96 overflow-y-auto border rounded-lg">
                    {loading ? (
                        <div className="flex justify-center items-center py-8">
                            <span className="loading loading-spinner loading-md text-primary"></span>
                            <span className="ml-2">加载中...</span>
                        </div>
                    ) : filteredDrivers.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="text-4xl mb-2">🔍</div>
                            <p className="text-base-content/60">
                                {searchTerm ? '未找到匹配的司机' : '暂无司机数据'}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-1 p-2">
                            {filteredDrivers.map((driver) => (
                                <div 
                                    key={driver.driver_uuid}
                                    className={`card card-compact cursor-pointer transition-all hover:shadow-md ${
                                        currentDriver?.driver_uuid === driver.driver_uuid 
                                            ? 'bg-primary/10 border-primary' 
                                            : 'bg-base-100 hover:bg-base-200'
                                    } border`}
                                    onClick={() => handleSelectDriver(driver)}
                                >
                                    <div className="card-body">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="text-2xl">👨‍💼</div>
                                                <div>
                                                    <h4 className="font-semibold text-base">
                                                        {driver.name}
                                                    </h4>
                                                    <p className="text-sm text-base-content/60">
                                                        工号：{driver.employee_id}
                                                    </p>
                                                </div>
                                            </div>
                                            {currentDriver?.driver_uuid === driver.driver_uuid && (
                                                <div className="badge badge-primary">已选择</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 已选择司机信息 */}
                {currentDriver && (
                    <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                        <div className="flex items-center space-x-2">
                            <span className="text-lg">✅</span>
                            <span className="font-medium">已选择：</span>
                            <span className="font-semibold text-primary">
                                {currentDriver.name}
                            </span>
                            <span className="text-base-content/60">
                                (工号：{currentDriver.employee_id})
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
                        disabled={!currentDriver}
                    >
                        确认选择
                    </button>
                </div>
            </div>
            <div className="modal-backdrop" onClick={onCancel}></div>
        </div>
    );
} 